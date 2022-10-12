import os
import sqlite3
import sys
sys.path.append("..")

from core.Config.Config import *
from core.DB.Db import *
from core.DB.UserModle import *
from core.DB.PostModle import *
from core.DB.DailyModle import *
from core.DB.TagModle import *
from core.DB.NoticeModle import *

from core.Controller.PostController import *
from core.Controller.NoticeController import *
from core.Controller.DailyController import *
from core.Controller.UserController import *

from core.ResultBody.ResultCode import *
from core.ResultBody.ResultBody import *
class InitSystem:
    # 错误队列
    error = []
    # 配置控制器
    configCtrl = Config_CTRL()
    dbCtrl = DB_CTRL()

    def check(self):
        self.checkConfig()
        self.checkDatabase()

        return self.error

    def checkConfig(self):
        if not self.configCtrl.is_Config_exist():
            self.configCtrl.initConfigFile()

    def checkDatabase(self):
        if not self.dbCtrl.is_Database_exist():
            self.error.append("db")


