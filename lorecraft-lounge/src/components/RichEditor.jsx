import { useState, useRef, useEffect } from 'react';

function RichEditor({ value, onChange, placeholder = "내용을 입력하세요..." }) {
  const editorRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    
    // 클립보드에서 데이터 가져오기
    const clipboardData = e.clipboardData;
    
    // 이미지 처리
    const items = clipboardData.items;
    for (let item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        handleImageUpload(file);
        return;
      }
    }
    
    // 텍스트 처리
    const text = clipboardData.getData('text/plain');
    const html = clipboardData.getData('text/html');
    
    // HTML이 있으면 HTML 사용, 없으면 텍스트 사용
    const contentToInsert = html || text.replace(/\n/g, '<br>');
    
    // 커서 위치에 삽입
    document.execCommand('insertHTML', false, contentToInsert);
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = `<img src="${e.target.result}" alt="업로드된 이미지" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
        document.execCommand('insertHTML', false, img);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    
    for (let file of files) {
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
        break; // 첫 번째 이미지만 처리
      }
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleInput();
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file);
      }
    };
    input.click();
  };

  const insertFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };

  const handleFileUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        const fileIcon = getFileIcon(fileExtension);
        const fileLink = `
          <div class="file-attachment" style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin: 10px 0; background: #f8f9fa;">
            <span style="font-size: 24px; margin-right: 10px;">${fileIcon}</span>
            <div style="flex: 1;">
              <div style="font-weight: 500; color: #333;">${fileName}</div>
              <div style="font-size: 12px; color: #666;">${fileSize} MB</div>
            </div>
            <a href="${e.target.result}" download="${fileName}" style="padding: 5px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">다운로드</a>
          </div>
        `;
        execCommand('insertHTML', fileLink);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFileIcon = (extension) => {
    const icons = {
      'pdf': '📄',
      'doc': '📝', 'docx': '📝',
      'xls': '📊', 'xlsx': '📊',
      'ppt': '📈', 'pptx': '📈',
      'txt': '📄',
      'zip': '🗜️', 'rar': '🗜️',
      'default': '📎'
    };
    return icons[extension] || icons.default;
  };

  const insertLink = () => {
    const url = prompt('링크 URL을 입력하세요:');
    if (url) {
      const text = prompt('링크 텍스트를 입력하세요:', url);
      if (text) {
        const link = `<a href="${url}" target="_blank">${text}</a>`;
        execCommand('insertHTML', link);
      }
    }
  };

  const formatHeading = (level) => {
    execCommand('formatBlock', `h${level}`);
  };

  return (
    <div className="rich-editor">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button type="button" onClick={() => execCommand('bold')} title="굵게">
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => execCommand('italic')} title="기울임">
            <em>I</em>
          </button>
          <button type="button" onClick={() => execCommand('underline')} title="밑줄">
            <u>U</u>
          </button>
        </div>
        
        <div className="toolbar-group">
          <button type="button" onClick={() => formatHeading(1)} title="큰 제목">
            H1
          </button>
          <button type="button" onClick={() => formatHeading(2)} title="중간 제목">
            H2
          </button>
          <button type="button" onClick={() => formatHeading(3)} title="작은 제목">
            H3
          </button>
        </div>
        
        <div className="toolbar-group">
          <button type="button" onClick={() => execCommand('insertOrderedList')} title="번호 목록">
            1.
          </button>
          <button type="button" onClick={() => execCommand('insertUnorderedList')} title="점 목록">
            •
          </button>
        </div>
        
        <div className="toolbar-group">
          <button type="button" onClick={insertLink} title="링크 삽입">
            🔗
          </button>
          <button type="button" onClick={insertImage} title="이미지 첨부">
            🖼️
          </button>
          <button type="button" onClick={insertFile} title="파일 첨부">
            📎
          </button>
        </div>
        
        <div className="toolbar-group">
          <button type="button" onClick={() => execCommand('removeFormat')} title="서식 제거">
            ✂️
          </button>
        </div>
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        onInput={handleInput}
        onPaste={handlePaste}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
      

      <style jsx>{`
        .rich-editor {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }

        .editor-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          padding: 10px;
          background: #f8f9fa;
          border-bottom: 1px solid #ddd;
        }

        .toolbar-group {
          display: flex;
          gap: 2px;
          padding-right: 10px;
          border-right: 1px solid #ddd;
        }

        .toolbar-group:last-child {
          border-right: none;
        }

        .editor-toolbar button {
          padding: 6px 10px;
          border: 1px solid #ddd;
          background: white;
          color: #333;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          min-width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .editor-toolbar button:hover {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
          box-shadow: 0 2px 4px rgba(0,123,255,0.15);
        }

        .editor-toolbar button:active {
          background: #e7f1ff;
          border-color: #0056b3;
          color: #0056b3;
          transform: translateY(1px);
        }

        .editor-toolbar button:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }

        .editor-content {
          min-height: 300px;
          padding: 20px;
          outline: none;
          line-height: 1.6;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .editor-content:empty::before {
          content: attr(data-placeholder);
          color: #6c757d;
          font-style: italic;
        }

        .editor-content img {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .editor-content h1 {
          font-size: 2em;
          margin: 20px 0 10px 0;
          color: #212529;
        }

        .editor-content h2 {
          font-size: 1.5em;
          margin: 18px 0 8px 0;
          color: #212529;
        }

        .editor-content h3 {
          font-size: 1.2em;
          margin: 16px 0 6px 0;
          color: #212529;
        }

        .editor-content ul, .editor-content ol {
          margin: 10px 0;
          padding-left: 30px;
        }

        .editor-content li {
          margin: 5px 0;
        }

        .editor-content a {
          color: #007bff;
          text-decoration: none;
        }

        .editor-content a:hover {
          text-decoration: underline;
        }

        .editor-content .file-attachment {
          display: flex;
          align-items: center;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin: 10px 0;
          background: #f8f9fa;
          transition: all 0.2s ease;
        }

        .editor-content .file-attachment:hover {
          border-color: #007bff;
          box-shadow: 0 2px 4px rgba(0,123,255,0.15);
        }

      `}</style>
    </div>
  );
}

export default RichEditor;