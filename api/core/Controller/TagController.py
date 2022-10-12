import sys
import time

sys.path.append("..")

from core.DB.TagModle import *

class TagController:
    def __init__(self):
        self.tag_handle = Tag()
    def delete(self,condition):

        selected_tag = self.tag_handle.select("TAG",condition)
        if(len(selected_tag) != 0):
            tag = {
                'pid':selected_tag[0][0],
                'name':selected_tag[0][1],
                'count':selected_tag[0][2]-1
            }
            if tag['count'] <= 0:
                self.tag_handle.deleteTagByPid(tag['pid'])
            else:
                self.tag_handle.updateByPid(tag)

    def insert(self,data):

        all_tag = self.tag_handle.select(table_name="TAG", condition="name='" + data + "'")
        if len(all_tag) == 0:
            tag = {
                'pid': str(time.time()),
                'name': data,
                'count': 1
            }
            self.tag_handle.insert(tag)
        else:
            tag = {
                'pid': all_tag[0][0],
                'name': data,
                'count': all_tag[0][2] + 1
            }
            self.tag_handle.updateByPid(tag)