import pandas as pd
import numpy as np

class FileHelper(object):
    file = None;

    delimiter = ','
    float_precision = None

    types = []
    roles = []

    def __init__(self, f):
        self.file = f


    def updateOptions(self, options):
        self.delimiter = options["delimiter"]
        self.float_precision = options["float_precision"]
        if (options["roles"] and options["types"]):
            self.types = options["types"]
            self.roles = options["roles"]


    def onUpload(self):
        return  pd.read_csv(self.file, nrows=1, sep=self.delimiter)

    def onProcess(self):
        data = pd.read_csv(self.file, sep=self.delimiter, float_precision=self.float_precision)
        for i, (type, column) in enumerate(zip(self.types, data)):
            if type == "nominal":                
                cats = pd.get_dummies(data[column])

                for x in cats.columns:
                    self.roles.insert(i, self.roles[i])
                self.roles.pop(i)
                #split data at the column to insert newely generated categories
                data_left = data.loc[:, :column]
                data_right = data.loc[:, column:]
                data_left.drop(column, axis=1, inplace=True)
                data_right.drop(column, axis=1, inplace=True)
                data = pd.concat([pd.concat([data_left, cats], axis=1, join='inner'), data_right], axis=1, join='inner')
            else: 
                data[column] = data[column].astype(np.float64)
        return data
        

    def dataParams(self, data):
        replacements = {
            "float64": "numeric",
            "object": "nominal", 
            "uint8": "nominal"
        }
        _types = [replacements[str(type)] if str(type) in replacements else str(type) for type in data.dtypes]
        _roles = self.roles
        return _types, _roles

        