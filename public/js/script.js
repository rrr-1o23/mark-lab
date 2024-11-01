require.config({ 
    paths: { 
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' 
    }
});

require(['vs/editor/editor.main'], function(monaco) {

    // ローカルストレージから以前の内容を取得する
    var savedContent = localStorage.getItem('editorContent') || '# Hello, Markdown!';

    // エディタ設定
    const editorOptions = {
        value: savedContent,
        language: 'markdown',
        theme: 'vs-dark',
        fontSize: 16,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        minimap: { enabled: true },
        lineNumbers: 'on',
        wordWrap: 'on'
    };
    var editor = monaco.editor.create(document.getElementById('editor-container'), editorOptions);

    // プレビュー用の要素を取得
    var previewContainer = document.getElementById("preview-container");

    // エディタの内容をMarkdownからHTMLに変換し、プレビューを更新する関数
    function updatePreview() {
        var markdown = editor.getValue();
        var outputFormat = document.getElementById("output-format");
        var formatValue = outputFormat.value;

        // ローカルストレージに内容を保存
        localStorage.setItem('editorContent', markdown);

        // AJAXリクエストを作成
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "convert-markdown.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
            // 変換されたHTMLをプレビューに表示
            previewContainer.innerHTML = xhr.responseText;
            }
        };

        // エラーハンドリング
        xhr.onerror = function () {
            console.error("AJAX request failed.");
            previewContainer.innerHTML = "<p style='color: red;'>Failed to load preview.</p>";
        };

        // markdownデータを送信
        xhr.send("markdown=" + encodeURIComponent(markdown) + "&format=" + encodeURIComponent(formatValue));
    }
    
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // プレビューのフォーマットが変更された場合の処理
    document.addEventListener('DOMContentLoaded', function() {
        // `<select>` 要素を取得
        const outputFormatSelect = document.getElementById('output-format');
    
        // イベントリスナーを追加
        outputFormatSelect.addEventListener('change', function(event) {
            const selectedFormat = event.target.value;
            console.log(`選択されたフォーマット: ${selectedFormat}`);
    
            // 選択されたフォーマットに基づいて処理を実行
            if (selectedFormat === 'markdown') {
                updatePreview();
            } else {
                updatePreview();
            } 
        });
    });

    // ダウンロードボタンが押された場合に処理
    document.getElementById('download-btn').addEventListener('click', function() {
        var format = document.getElementById('output-format').value;
        var content = editor.getValue();
        var blob;
        var filename;

        if (format === 'markdown') {
            blob = new Blob([content], { type: 'text/markdown' });
            filename = 'document.md';
        } else if (format === 'html') {
            // var htmlContent = marked.parse(content);
            blob = new Blob([`<html><body>${content}</body></html>`], { type: 'text/html' });
            filename = 'document.html';
        } else {
            alert('サポートされていないフォーマットです。');
            return;
        }

        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });


    
    // リアルタイムでエディタの内容が変わったらプレビューを更新 (300msの遅延)
    editor.onDidChangeModelContent(debounce(updatePreview, 300));

    // 初回読み込み時にもプレビューを更新
    updatePreview();
});