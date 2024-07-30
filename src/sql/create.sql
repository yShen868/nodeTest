create table step
(
    id          bigint auto_increment comment 'id'
        primary key,
    user        varchar(64)                        null comment '账号',
    password    varchar(64)                        null comment '密码',
    is_exist    tinyint  default 1                 null comment '是否存在',
    create_time datetime default CURRENT_TIMESTAMP null comment '创建时间',
    step_start  int                                null comment '步数最小范围',
    step_end    int                                null comment '步数最大范围',
    time_start  datetime                           null comment '时分秒 24小时制 一天最早时间 例 23:10:10',
    time_end    datetime                           null comment '时分秒 24小时制 一天最晚时间 例 23:10:10',
    date_start  datetime                           null comment '日期最早时间 年月日时分秒',
    date_end    datetime                           null comment '日期最晚时间 年月日时分秒',
    week_day    varchar(32)                        null comment '一周七天 1234567  ,分割 例子 2,3,4,7',
    enable      tinyint  default 1                 not null comment '是否开启'
);

-- auto-generated definition
create table step_log
(
    id          bigint auto_increment comment 'id'
        primary key,
    user        varchar(64)                        null comment '账号',
    is_exist    tinyint  default 1                 null comment '是否存在',
    create_time datetime default CURRENT_TIMESTAMP null comment '创建时间-执行时间',
    step        int                                null comment '是否成功',
    step_id     int                                null comment '规则id'
);


docker run --name node-mysql2 -p 4022:3306 -e MYSQL_ROOT_PASSWORD=123456 -e TZ=Asia/Shanghai -d mysql:8


sudo ln -s /etc/nginx/sites-available/wxproject /etc/nginx/sites-enabled/

// 软链
sudo ln -s /usr/nodeProject/project/wxProject /usr/share/nginx/

启动 Nginx: sudo systemctl start nginx
停止 Nginx: sudo systemctl stop nginx
重启 Nginx: sudo systemctl restart nginx
检查 Nginx 服务状态: sudo systemctl status nginx

安装 MySQL 服务器:
Bash
深色版本
sudo yum install mysql-server
步骤 3: 启动 MySQL 服务
启动 MySQL 服务:
Bash
深色版本
sudo systemctl start mysqld
检查 MySQL 服务状态:
Bash
深色版本
sudo systemctl status mysqld


update user set host = '%' where user = 'root';

// 修改密码
ALTER USER 'root'@'%' IDENTIFIED BY 'yue123!@KAI';

// 修改远程访问
update mysql.user set host = '%' where user = 'root';

select * from  mysql.user  where user = 'root';
// 权限刷新
flush privileges;

// nginx 配置
    server {
       listen       8090;
       server_name 127.0.0.1; # 使用 localhost 或者 127.0.0.1 作为 server_name

       root wxProject/dist; # 替换为你的 dist 文件夹路径
       index index.html index.htm;

       location / {
            try_files $uri $uri/ /index.html =404; # 处理 Vue.js 的路由
       }

        # 代理 API 请求到后端服务器
        location /sss/ { # 注意这里使用了 /sss/ 而不是 /api/
             # 移除 /sss 前缀
            rewrite ^/sss/(.*)$ /$1 break;
            proxy_pass http://127.0.0.1:8085;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-NginX-Proxy true;
            proxy_redirect off;
            proxy_read_timeout 90;
        }
    }


            pm2 restart ecosystem.config.js --env production
