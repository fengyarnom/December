import random
import sys



from core.ResultBody.ResultBody import *
from core.ResultBody.ResultCode import *
from core.Session.Session import Session

sys.path.append("..")

from core.DB.UserModle import  *

class UserController:
    def __init__(self):
        self.user_handle = User()

    def check(self,data):
        user = self.user_handle.select("USER",condition="username='"+data['username']+"'")

        if(len(user) == 0):
            return ResultBody().res2json(ResultCode.USER_NOT_EXIST,None)
        user = dict(zip(User().format, user[0]))

        if data['password'] == user['password']:
            sessionHandle = Session()
            sessionHandle.set("username", data['username'])
            key = user['username'] + ''.join(random.sample('zyxwvutsrqponmlkjihgfedcba', 10))
            sessionHandle.set("authorized", key)

            return ResultBody().res2json(ResultCode.LOGIN_SUCESS,key)
        else:
            return ResultBody().res2json(ResultCode.PASSWORD_ERROR,None)
