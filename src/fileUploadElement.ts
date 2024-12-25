export const fileUploadElement = `<head>
    <style>
        .upload-container {
            width: 100px;
            height: 30px;
            border-radius: 4px;
            background-color: var(--b3-toolbar-hover) ;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            cursor: pointer;
            text-align: center;
            
        }


        .upload-input {
            display: none;
        }
        .wd {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none; /* 防止该元素的文本被选中 */
        }
    </style>

</head>
<body>
    <div id="uploadContainer" class="upload-container">
        <div class="wd b3-list-item__text">上传<svg width="15" height="15">
            <use xlink:href="#iconAlist"></use>
        </svg>附件</div>
        <input type="file" id="fileInput" class="upload-input" multiple>
    </div>
</body>`;
