import sys
import time

sys.path.append("..")
from core.DB.PostModle import *
from core.Controller.TagController import *
from core.ResultBody.ResultBody import *
from core.ResultBody.ResultCode import *

class PostController:
    def __init__(self):
        self.post_handle = Post()
    def delete(self,condition):

        tag_controller = TagController()
        all_post = self.post_handle.select("POST",condition=condition)
        for item in all_post[0][3].split(';'):
            tag_controller.delete(condition="name='"+item+"'")
        self.post_handle.delete("POST", condition)

    def insert(self,data):

        tag_controller = TagController()
        post = {
            'pid': time.strftime("%Y%m%d%H%M%S", time.localtime()),
            'title': data['title'],
            'content': data['content'],
            'author': 'Yarnom',
            'create_date': time.strftime("%Y-%m-%d", time.localtime()),
            'views': 0,
            'tags': data['tags'] if data['tags'] != "" else "默认",
            'is_top': bool(data['isTop'])
        }
        self.post_handle.insert(post)

        for item in post['tags'].split(';'):
            tag_controller.insert(item)

        return ResultBody().res2json(ResultCode.SUCCESS_POST_CREATED, None)
    def update(self,data):

        tag_controller = TagController()
        post = {
            'pid': data['pid'],
            'title': data['title'],
            'content': data['content'],
            'tags': data['tags'],
            'is_top': data['isTop']
        }

        pre_post = self.post_handle.select(
            table_name="POST",
            condition="pid=" + post['pid']
        )

        if pre_post[0][3] != post['tags']:
            for item in pre_post[0][3].split(';'):
                tag_controller.delete(condition="name='"+item+"'")
            for item in post['tags'].split(';'):
                tag_controller.insert(item)

        self.post_handle.updateByPid(post)
        return ResultBody().res2json(ResultCode.SUCCESS, None)