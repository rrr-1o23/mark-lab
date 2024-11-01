<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monaco Editor</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js"></script>
</head>

<body>
    <div class="d-flex flex-column" style="width: 100vw">

        <div class="container">
            <div class="row">
                <div class="col-md-6"></div>

                <div class="col-md-3">
                    <label for="format" class="form-label">Output Format:</label>
                    <select id="output-format" name="format" class="form-select custom-select">
                        <option value="html">HTML</option>
                        <option value="markdown" selected>Markdown</option>
                    </select>
                </div>

                <div class="col-md-3 d-flex align-items-end">
                    <button id="download-btn" class="btn btn-success w-100">ダウンロード</button>
                </div>
            </div>

        </div>

        
        <!-- エディター -->
        <div class="d-flex flex-row">
            <div id="editor-container" class='m-1'></div>
            <div id="preview-container" class='m-1'></div>
        </div>

    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- JavaScriptファイルの読み込み -->
    <script src="js/script.js"></script>
</body>
</html>
