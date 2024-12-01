export const myCardLink =`
<div>

    <style>
        /* 独特类名的卡片样式 */
        .custom-card-link {
            border: 1px solid #ddd;
            padding: 16px;
            border-radius: 12px;
            max-width: 240px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease, transform 0.3s ease;
            display: flex;
            align-items: center;
            text-align: left;
            color: inherit;
            text-decoration: none;
            position: relative;
            overflow: hidden;
        }

        .custom-card-link:hover {
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            transform: translateY(-5px);
        }

        .custom-card-link__image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            margin-right: 16px;
        }

        .custom-card-link__title {
            font-size: 1.2em;
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
            transition: text-decoration 0.3s ease;
        }

        .custom-card-link__title:hover {
            text-decoration: underline;
        }

        .custom-card-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: inherit;
            filter: blur(10px) brightness(0.8);
            z-index: -1;
        }

        .custom-card-link::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: inherit;
            filter: blur(5px) brightness(1.2);
            z-index: -1;
        }
    </style>

<div>
    <a href="https://example.com" class="custom-card-link">
        <img src="http://127.0.0.1:5244/d/movie_pc/2024-12-1/【哲风壁纸】夕阳下的飞机-旅行.png" alt="示例图片" class="custom-card-link__image">
        <span class="custom-card-link__title">示例链接</span>
    </a>
</div>

</div>`;
;