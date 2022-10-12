from flask import jsonify



class ResultBody:
    def res2json(self,result_code, data):
        return jsonify({
            'code': result_code.value['code'],
            'data': data,
            'message': result_code.value['message']
        })



