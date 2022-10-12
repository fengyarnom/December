import os
import json
class Config_CTRL:
    def __init__(self):
        self.config_file_name = "config.json"

    def is_Config_exist(self):
        if os.path.exists(self.config_file_name):
            return True
        else:
            return False

    def initConfigFile(self):
        config = {
            "proj_name": "December"
        }
        json_object = json.dumps(config)
        with open("config.json", "w") as f:
            f.write(json_object)

    def updateConfigFile(self,new_config):
        config_data = None
        with open("config.json", "r",encoding="utf-8") as f:
            config_data = json.load(f)
            config_data.update(new_config)

        with open("config.json", "w",encoding="utf-8") as f:
            json.dump(config_data,f)