<?php
require_once "./vendor/autoload.php";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $markdown = $_POST['markdown'];
    // Parsedownを使用してMarkdownをHTMLに変換
    $Parsedown = new Parsedown();
    $html = $Parsedown->text($markdown);

    if ($_POST['format'] === 'markdown'){
        // 変換結果を返す
        echo $html;
    } else {
        echo nl2br(htmlspecialchars($html));
    }
}
// echo htmlspecialchars($html); HTMLをエスケープできる．
