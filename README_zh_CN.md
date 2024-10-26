## 插件介绍
联动Alist，实现大型附件管理，释放思源笔记空间  
[主要功能演示视频](https://ld246.com/article/1727347960883?r=stevehfut)
#### 目前有的功能  
1. 嵌入alist网页，并自动识别alist的链接，不再跳转到浏览器  
2. 上传文件到alist，并将链接插入当前笔记  
3. 一键全量备份数据到alist
4. 定时全量备份到alist (beta)(代码运行在前端故需保证思源笔记一直在后台运行)
5. 支持通过标签页打开链接（Alt+左键） 
6. 在alist中初步实现视频记录[需要配置一下alist](https://ld246.com/article/1727347960883/comment/1729590148031#comments) #感谢[@wilsons](https://ld246.com/member/wilsons)提供

#### 达到目的（使用场景）
1. 方便将数据备份到alist
2. 嵌入alist网页，用于大型附件的的上传，而思源笔记只需记下链接即可（win端可以直接拖拽获取上传的附件链接）
3. 实现部分附件的预览或在线编辑（通过alist实现）

### 如发现bug，欢迎反馈，若有什么有趣的想法或需求（与本插件相关）也欢迎反馈

## 可能会遇到的问题

- alist 配置相关
  - 填网址时不要在最后加“/” 
   正确示例： 
   http://alist.example.com  
  错误示例：
   http://alist.example.com/

   - 路径填写示例  
    正确示例：/alist/siyuan
      > 后面不要加“/”
   - 默认文件名后面要加.zip

## 展望
 尝试更深入联动alist  
 todo:支持将思源笔记里的附件上传到alist并替换链接  

## 更新日志  
 0.0.6:  
 优化：增加在顶栏部分区域实现拖拽文件上传，以优化上传文件体验(beta)   

 0.0.5:  
 增加：'是否改为'Ctrl+左键'触发' 选项提高插件兼容性  
 增加：在alist中初步实现视频记录[需要配置一下alist](https://ld246.com/article/1727347960883/comment/1729590148031#comments) #感谢[@wilsons](https://ld246.com/member/wilsons)提供

 0.0.4:  
 优化：报错反馈 [#1](https://github.com/loonghfut/siyuan-alist/issues/1)  

 0.0.3:   
 支持定时备份到alist  (beta)(代码运行在前端故需保证思源笔记一直在后台运行)  
 优化全量备份交互  

 0.0.2:  
 支持通过标签页打开链接（Alt+左键） 
  
 0.0.1:   
 初版，为连接互传插件中alist相关功能的提取  



## 最后
自用插件，开源分享，代码凌乱不堪，插件使用了思源社区的模板，主要参考https://github.com/siyuan-community/siyuan-developer-docs


### 禁止使用与免责约定：
禁止使用本产品用于任意违法乱纪相关行为。
作者不为你使用本产品所产生的任何后果负责。