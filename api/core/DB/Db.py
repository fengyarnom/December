import json
import os
import sqlite3


class DB_CTRL:
    def is_Database_exist(self):
        with open("config.json","r",encoding="utf-8") as f:
            config = json.load(f)
            if "db_name" in config:
                if os.path.exists(config['db_name']+".db"):
                    return True
                else:
                    print("Wrror : Database lost.")
                    return False
            else:
                print("Wrror : Database does not exist.")
                return False

    def connectDatabase(self):
        conn = None
        with open("config.json","r",encoding="utf-8") as f:
            config = json.load(f)
        try:
            # conn = sqlite3.connect(config['db_name'] + ".db",check_same_thread=False)
            conn = sqlite3.connect(config['db_name'] + ".db")
        except Exception as e:
            print(e)
        return conn
    
    def select(self,table_name="",condition="",order_by="",desc="",limit="",offset=""):
        conn = self.connectDatabase()
        cursor = conn.cursor()

        if table_name is None:
            return False
        else:
            sql = "SELECT * FROM {table_name}".format(table_name=table_name)

            if condition != "":
                sql += " WHERE "+condition
            
            if order_by != "":
                sql += " ORDER BY "+order_by
                if desc != "":
                    sql += " DESC "

            if limit != "":
                sql += " LIMIT "+limit
                if offset != "":
                    sql += " Offset "+offset
            cursor.execute(sql)
            rows = cursor.fetchall()
            
            return rows
        
    def getCount(self,table_name,condition=""):
        conn = self.connectDatabase()
        cursor = conn.cursor()
        sql = "select count(*) from "+table_name
        if condition != "":
                sql += " WHERE "+condition
        cursor.execute(sql)
        count = cursor.fetchone()
        return count[0]

    def delete(self,table_name,condition):
        conn = self.connectDatabase()
        cursor = conn.cursor()
        sql = "delete from "+table_name+" where "+condition
        cursor.execute(sql)
        conn.commit()
    
    def sqliteEscape(self,string):
        string = string.replace("'", "''")       
        return string
            

        
        




