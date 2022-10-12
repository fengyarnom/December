import sys
import time

sys.path.append("..")
from core.DB.PostModle import *
from core.Controller.TagController import *
from core.DB.NoticeModle import *
from core.ResultBody.ResultBody import *
from core.ResultBody.ResultCode import *

class NoticeController:
    def __init__(self):
        self.notice_handle = Notice()
    def delete(self,condition):
        self.notice_handle.deleteNoticeByPid(condition)
    
    def update(self,data):
        notice = {
            'pid':data['pid'],
            'title':data['title'],
            'content':data['content'],
        }
        self.notice_handle.updateByPid(notice)
        return ResultBody().res2json(ResultCode.SUCCESS, None)
    
    def insert(self,data):
        notice = {
            'pid':time.strftime("%Y%m%d%H%M%S", time.localtime()),
            'title':data['title'],
            'content':data['content'],           
            'create_date':time.strftime("%Y-%m-%d", time.localtime()),
            'visible':1
        }
                
        self.notice_handle.insert(notice)
        return ResultBody().res2json(ResultCode.SUCCESS_POST_CREATED, None)