from flask import session

class Session:
    def set(self,key,value):
        session[key] = value
        return True
    
    def get(self,key):
        return session.get(key)
    
    def delete(self,key):
        session.pop(key)
        return True
    
    



