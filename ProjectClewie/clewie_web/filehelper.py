import pandas as pd
import numpy as np

class FileHelper(object):
    file = None;

    delimiter = ','
    float_precision = None
    nrows = 5
    usecols = None

    types = []
    features = []
    labels = []

    def __init__(self, f):
        self.file = f


    def updateOptions(self, options):
        self.delimiter = options["delimiter"]
        float_precision = options["float_precision"]
        if (options["roles"] and options["types"]):
            self.types = options["types"]
            self.features = []
            self.labels = []
            for i, v in enumerate(options["roles"]):
                if v == "feature":
                    self.features.append(i)
                elif v == "label":
                    self.labels.append(i)
                else:
                    pass



    def readPartial(self):
        return pd.read_csv(self.file, nrows=1, sep=self.delimiter)

    def typesSetup(self):
        _types = []
        for type in self.types:
            if type == "numeric":
                _types.append(np.float64)
            elif type == "nominal":
                _types.append("category")
        return _types


    
    def dataParams(self, data):
        if len(self.types) == 0 or len(self.features + self.labels) == 0:
            colcount = len(data.iloc[0])
            return ["numeric" for i in range(colcount)], ["feature" for i in range(colcount-1)] + ["label"]
        roles = [i for i in self.features + self.labels]
        for i in self.features:
            roles[i] = "feature"
        for i in self.labels:
            roles[i] = "label"
        return self.types, roles


    def readAll(self):
        _types = self.typesSetup()
        data = pd.read_csv(self.file, sep=self.delimiter)
        for type, column in zip(_types, data):
            if type == "category":
                cats = pd.get_dummies(data[column])
                data.drop(column, axis=1, inplace=True)
                data = pd.concat([data, cats], axis=1, join='inner')
            else: 
                data[column] = data[column].astype(type)
        return data
        
        