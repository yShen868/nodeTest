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



docker run --name node-mysql -p 4011:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql
docker run --name node-mysql2 -p 4022:3306 -e MYSQL_ROOT_PASSWORD=123456 -e TZ=Asia/Shanghai -d mysql:8


nginx config

在 CentOS 上安装 Nginx 后，你可以找到以下主要目录和文件：

安装目录:
Nginx 的主安装目录通常是 /usr/share/nginx/。
Nginx 的二进制文件位于 /usr/sbin/nginx。
配置文件:
主要的 Nginx 配置文件通常位于 /etc/nginx/nginx.conf。
另外，你可能会看到 /etc/nginx/conf.d/ 目录，这里可以存放额外的配置文件。
虚拟主机配置文件通常位于 /etc/nginx/conf.d/ 或 /etc/nginx/sites-enabled/ （虽然在 CentOS 中默认可能只使用 conf.d/）。
日志文件:
Nginx 的访问日志通常位于 /var/log/nginx/access.log。
错误日志通常位于 /var/log/nginx/error.log。
网站根目录:
默认情况下，Nginx 的网站根目录是 /usr/share/nginx/html。这个目录用于存放网站的 HTML 文件和其他资源。

sudo ln -s /etc/nginx/sites-available/wxproject /etc/nginx/sites-enabled/

sudo ln -s /usr/nodeProject/project/wxProject /usr/share/nginx/
服务管理命令:
你可以使用 systemctl 命令来管理 Nginx 服务：
启动 Nginx: sudo systemctl start nginx
停止 Nginx: sudo systemctl stop nginx
重启 Nginx: sudo systemctl restart nginx
检查 Nginx 服务状态: sudo systemctl status nginx
使 Nginx 在系统启动时自动启动: sudo systemctl enable nginx
配置测试:
在修改 Nginx 配置后，可以通过 sudo nginx -t 命令来检查配置文件是否有语法错误。
如果一切正常，你可以使用 sudo systemctl reload nginx 或 sudo service nginx reload 来重新加载配置而无需重启整个服务。

重启 sudo systemctl restart mysqld
GRANT ALL PRIVILEGES ON *.* TO 'root'@'0.0.0.0' IDENTIFIED BY 'yue123!@KAI' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'221.217.9.229' IDENTIFIED BY 'yue123!@KAI' WITH GRANT OPTION;
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

密码 yue123!@KAI


GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'yue123!@KAI' WITH GRANT OPTION;



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