# order-manager
通过Node实现的订单排号管理系统

![Screen shot](https://raw.githubusercontent.com/hfut-xcsoft/order-manager/master/order-manager.png)

## Features

### UI

+ [Angularjs](https://angular.io) - 前端开发框架
+ [Sass](http://sass-lang.com) - CSS预处理器
+ [Gulp](http://gulpjs.com) - 项目构建工具

### API

+ [Express](http://expressjs.com) - Node Web框架
+ [MongoDB](https://www.mongodb.com/) - NoSQL数据库
+ [Redis](http://redis.io) - 内存数据库（用作缓存）

## Getting Started

### API

```
$ cd api
$ npm install
$ npm start
```

运行API之前需要在本机启动MongoDB，Redis则不强制要求

### UI

```
$ cd www
$ npm install -g gulp bower && npm install && bower install
$ npm start
```

安装完成并运行后，打开浏览器访问`http://localhost:9000`即可！

## License

[GPL V3](https://github.com/hfut-xcsoft/order-manager/blob/master/LICENSE)


