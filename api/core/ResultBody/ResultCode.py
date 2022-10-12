from enum import Enum


class ResultCode(Enum):
    SUCCESS = {"code": 200, "message": "Success"}
    SUCCESS_POST_CREATED = {"code": 201, "message": "文章创建成功"}


    LOGIN_SUCESS = {"code": 301, "message": "Successfully Login ,Relocation to admin"}

    PARAMETER_ERROR= {"code": 401, "message": "Parameter passing error"}
    USER_NOT_EXIST = {"code": 410, "message": "User does not exist"}
    PASSWORD_ERROR = {"code": 411, "message": "Password error"}
    AUTHORIZATION_FAILED = {"code": 420, "message": "Authorization failed"}

