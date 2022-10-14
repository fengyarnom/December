import time

from flask import Flask, redirect, url_for, request, render_template
from core.InitSystem.InitSystem import *
from core.Session.Session import *
from flask import jsonify
import random

# 初始化系统
initHandle = InitSystem()
# 导出错误队列，处理错误
init_error = initHandle.check()
# Flask 配置
app = Flask(__name__)
# session 密钥
app.config['SECRET_KEY'] = 'Yarnom'
app.config['DEBUG'] = True
@app.route("/")
def index():
    # 当程序运行时，会检查config文件和数据库
    # 当出现错误时，触发修复
    if init_error:
        return redirect(url_for("repair"))

    # 正常跳转
    return render_template("index.html")

@app.route("/<path:url_path>")
def other(url_path):
    # 路由跳转，一切跳转交给前端，后端只负责处理数据
    return render_template("index.html")



@app.route("/api/getTableCount/<string:table_name>", methods=['GET'])
def getTableCount(table_name):
    # GET condition 参数
    condition = request.args.get('condition') if request.args.get('condition') != None else "",

    count = DB_CTRL().getCount(table_name, condition[0])
    return ResultBody().res2json(ResultCode.SUCCESS,count)


@app.route("/api/delete/<string:table_name>/<string:condition>", methods=['POST'])
def delete(table_name, condition):
    if table_name == "POST":
        post_controller = PostController()
        post_controller.delete(condition)

    elif table_name == "NOTICE":
        notice_controller = NoticeController()
        notice_controller.delete(condition)

    elif table_name == "DAILY":
        daily_controller = DailyController()
        daily_controller.delete(condition)
    else:
        return ResultBody.res2json(ResultCode.PARAMETER_ERROR,None)
    return ResultBody().res2json(ResultCode.SUCCESS,None)


@app.route("/api/seleteTable", methods=['GET'])
def getPost():
    dbHandle = DB_CTRL()
    all = dbHandle.select(
        table_name=request.args.get('class'),
        order_by=request.args.get('order_by') if request.args.get('order_by') else "",
        desc=request.args.get('desc') if request.args.get('desc') else "",
        limit=request.args.get('limit') if request.args.get('limit') else "",
        offset=request.args.get('offset') if request.args.get('offset') else "",
        condition=request.args.get('condition') if request.args.get('condition') else "",
    )

    return_data = []
    if request.args.get('class') == "POST":
        for item in all:
            return_data.append(dict(zip(Post().format,item)))

    elif request.args.get('class') == "DAILY":
        for item in all:
            return_data.append(dict(zip(Daily().format,item)))


    elif request.args.get('class') == "NOTICE":
        for item in all:
            return_data.append(dict(zip(Notice().format,item)))

    elif request.args.get('class') == "TAG":
        for item in all:
            return_data.append(dict(zip(Tag().format,item)))

    return ResultBody().res2json(ResultCode.SUCCESS,return_data)


@app.route("/api/login", methods=['POST'])
def login():
    if request.method == "POST":
        # 获取前端发来的json数据
        data = request.get_json()['data']
        # 查询数据库

        user_controller = UserController()
        return user_controller.check(data)




@app.route("/api/modify", methods=['GET'])
def modify():
    if request.args.get('class') == 'post':
        postHandle = Post()
        post = postHandle.select(
            table_name="POST",
            condition="pid=" + request.args.get('pid')
        )
        postDict = dict(zip(postHandle.format, post[0]))

        return jsonify(postDict)
    elif request.args.get('class') == 'notice':
        noticeHandle = Notice()

        notice = noticeHandle.select(
            table_name="Notice",
            condition="pid=" + request.args.get('pid')
        )
        noticeDict = dict(zip(noticeHandle.format, notice[0]))
        noticeDict["isNotice"] = 1
        return jsonify(noticeDict)
    else:
        dailyHandle = Daily()
        daily = dailyHandle.select(
            table_name="DAILY",
            condition="pid=" + request.args.get('pid')
        )
        dailyDict = dict(zip(dailyHandle.format, daily[0]))
        dailyDict["isDaily"] = 1
        return jsonify(dailyDict)


@app.route("/api/newPost", methods=['POST', 'GET'])
def newPost():
    if request.method == 'POST':
        data = request.get_json()['data']
        # Sqlite3 转义处理
        data['title'] = DB_CTRL().sqliteEscape(data['title'])
        data['content'] = DB_CTRL().sqliteEscape(data['content'])

        if data.get("isDaily") == 1:
            daily_controller = DailyController()
            # 更新
            if data['pid'] != '':
                return daily_controller.update(data)
            # 新建
            else:
                return daily_controller.insert(data)

        elif data.get('isNotice') == 1:
            notice_controller = NoticeController()
            # 更新
            if data['pid'] != '':
                return notice_controller.update(data)

            # 新建
            else:
                return notice_controller.insert(data)

        # 处理文章  
        else:
            post_controller = PostController()
            data['isTop'] = int(data.get('isTop'))
            # 更新
            if data['pid'] != '':
                return post_controller.update(data)

            # 新建
            else:
                return post_controller.insert(data)



@app.route("/api/authorize", methods=['POST'])
def authorization():
    if request.method == 'POST':
        data = request.get_json()['data']
        sessionHandle = Session()
        if sessionHandle.get('authorized') == data.get('authorized'):
            return ResultBody().res2json(ResultCode.LOGIN_SUCESS,None)
        else:
            return ResultBody().res2json(ResultCode.AUTHORIZATION_FAILED,None)


@app.route("/repair")
def repair():
    while (init_error):
        check = init_error.pop()
        if check == 'db':
            return redirect(url_for("create_database"))
    return redirect(url_for("index"))


@app.route("/begin/create_database", methods=['POST', 'GET'])
def create_database():
    db_ctrl = DB_CTRL()
    if db_ctrl.is_Database_exist():
        return redirect(url_for("index"))

    if request.method == 'GET':
        return render_template('create_database.html')
    else:
        user = {
            "id": time.strftime("%Y%m%d%H%M%S", time.localtime()),
            "username": request.form['username'],
            "password": request.form['password'],
            "registration_time": time.strftime("%Y-%m-%d", time.localtime()),
            "permission": 0
        }

        config = {
            "db_name": request.form['database_name']
        }
        initHandle.configCtrl.updateConfigFile(config)

        userHandle = User()
        userHandle.init_table()
        userHandle.insert(user)

        postHandle = Post()
        postHandle.init_table()

        dailyHandle = Daily()
        dailyHandle.init_table()

        noticeHandle = Notice()
        noticeHandle.init_table()

        tagHandle = Tag()
        tagHandle.init_table()
        return redirect(url_for("repair"))


if __name__ == '__main__':
    app.run('0.0.0.0', port=80)
