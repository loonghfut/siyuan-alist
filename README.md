## 插件介绍
联动Alist，实现大型附件管理，释放思源笔记空间  
[主要功能演示视频](https://ld246.com/article/1727347960883?r=stevehfut)
#### 目前有的功能  
1. 嵌入alist网页，并自动识别alist的链接，不再跳转到浏览器  
2. 上传文件到alist，并将链接插入当前笔记  
3. 一键全量备份数据到alist
4. 定时全量备份到alist (代码运行在前端故需保证思源笔记一直在后台运行)
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

- 建议发布服务的工作空间不要使用此插件

## 展望(开发计划)
### 尝试更深入联动alist  

DONE:实现alist上传进度可视化  

DOING:支持将思源笔记里的附件上传到alist并替换链接  开发中...  

TODO
 ~~画个大饼：不再使用alist网页嵌入，而通过alist前端项目集成到思源（方便更深入联动alist）~~  
 大饼终究是大饼，目前暂时放弃嵌入alist前端页面（测试过程中，发现嵌入alist前端页面后，很难实现点击alist文件链接跳转到指定的alist页面【欢迎大佬提供建议】，除非用思源后端跑一个alist前端服务【但这不大可能，也没必要】，所以暂时放弃了）  
 嵌入alist前端的好处，通过api交互，可以很方便地修改alist前端代码，来实现和思源的交互。   
    
 再画一个饼：用vue写一个（或找个开源的改）alist前端，可能要很久。。

## 更新日志  
 0.0.10:  
 优化：移除部分无用代码  
 增加：上传文件到alist时，支持进度显示（beta）  
 增加：新增beta模式，用于测试新功能，默认关闭，需要手动开启  

 0.0.9:  
 修复：设置自动备份时，因填写时间格式错误，系统一直卡在启动页面 [#3](https://github.com/loonghfut/siyuan-alist/issues/3#issue-2643143686)   
 优化：增加自动备份时间格式填写错误提醒  
 
 0.0.8:  
 安全：在发布状态下，插件禁用（后续考虑开放部分功能） [#2.2](https://github.com/loonghfut/siyuan-alist/issues/2)  
 优化：优化插件设置体验，部分配置变更后自动刷新  
 安全：默认禁止敏感信息日志输出，防止发布状态下alist配置信息泄漏（如有遗漏，欢迎反馈）  
   
 0.0.7:  
 优化：触发方式支持自定义 [#2.1](https://github.com/loonghfut/siyuan-alist/issues/2#issuecomment-2439596132)  
 移除：移除 '是否改为`Ctrl+左键`触发' 选项（没有太大用处）
    
 0.0.6:  
 优化：增加在顶栏部分区域实现拖拽文件上传，以优化上传文件体验(beta)   

 0.0.5:  
 增加：'是否改为'Ctrl+左键'触发' 选项提高插件兼容性  
 增加：在alist中初步实现视频记录[需要配置一下alist](https://ld246.com/article/1727347960883/comment/1729590148031#comments) #感谢[@wilsons](https://ld246.com/member/wilsons)提供

 0.0.4:  
 优化：报错反馈 [#1](https://github.com/loonghfut/siyuan-alist/issues/1)  

 0.0.3:   
 支持定时备份到alist  (代码运行在前端故需保证思源笔记一直在后台运行)  
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