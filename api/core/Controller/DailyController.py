import sys
sys.path.append("..")
from core.DB.DailyModle import *
from core.ResultBody.ResultBody import *
from core.ResultBody.ResultCode import *
import time


class DailyController:
    def __init__(self):
        self.daily_handle = Daily()
    def delete(self, condition):

        self.daily_handle.delete("DAILY", condition)
    
    def update(self,data):
        daily = {
            'pid': data['pid'],
            'title': data['title'],
            'content':data['content'],
        }
        self.daily_handle.updateByPid(daily)
        return ResultBody().res2json(ResultCode.SUCCESS,None)
    def insert(self,data):
        daily = {
            'pid': time.strftime("%Y%m%d%H%M%S", time.localtime()),
            'title': data['title'],
            'content': data['content'],
            'create_date': time.strftime("%Y-%m-%d", time.localtime()),
            }
                
        self.daily_handle.insert(daily)
        return ResultBody().res2json(ResultCode.SUCCESS_POST_CREATED, None)