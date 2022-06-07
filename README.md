# 企微版h5项目

> 此项目是多页面工程项目，vue2+webpack+vant开发
> 非定制化交付项目都要使用此工程,交付类型的项目请单独新建仓库
    
## 构建步骤

		``` bash
		# 安装依赖
		npm install
		# 本地测试
		npm run serve
		# 本地测试二 调试单页工程
		npm run serve 文件夹名称
		# 打包dev(目前为自动化构建，merge到dev自动构建)
		npm run build:dev
		# 打包pre(目前为自动化构建，merge到pre自动构建)
		npm run build:pre
		# 打包uat(目前为自动化构建，merge到uat自动构建)
		npm run build:uat
		# 打包prod
		npm run build:prod
		```
		http://localhost:8070/{pages下文件夹名称}.html#/

## 非定制化交付项目都要使用此工程
1、不要使用qwH5、wcH5、slidebarH5和pages下相同文件名字的命名。
2、例如:
     方德项目，英文名forthright（他们公司的英文名非我自己起的）
     在scr->pages新建一个文件夹forthright
     文件夹内包含
	   # 主入口
	   app.vue
	   # 项目图片
	   images
	   # 主入口
	   main.html
       # 主入口	   
	   main.js
       # 路由	   
	   routers
	   # 页面
	   views
3、启动项目的时候启动对应的项目文件夹；
4、如果定制化项目非一个整体的页面只是组件、页面新增也要新增文件夹；
引入的时候引入该文件的路径，回头删除和跟踪的时候也知道是哪个定制化项目的
例如：
    万达项目，wanda
	新建wanda文件
	比如使用了wanda的私有化有一个组件要放在专业版的画像里边
	在wanda文件下新建一个components，然后在qwH5文件使用；
	
## 以上这样的优点:
1、可以发现都有哪个地址化公司的项目,公司购买到期或者弃用了我们可以直接删除wanda这个文件，报错的引用类地址删除代码
2、多页面不用每次非交付类定制化都要新申请域名；
3、保证我们的项目的加载流程，非一个文件夹下的不加载资源；
	      
## 更改CI/CD文件
更改docker 项目名:tcloud-crm-web-qw-prod,更改版本号：hub01.71360.com:7000/tcloud-crmqw-web:v1.0.36

## 有问题请联系
peter.zhang@marketingforce.com
