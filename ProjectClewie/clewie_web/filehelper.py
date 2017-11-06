import pandas as pd

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
                print(i, v)
                if v == "feature":
                    self.features.append(i)
                elif v == "label":
                    self.labels.append(i)
                else:
                    pass
            print(self.types, self.features, self.labels)



    def readPartial(self):
        return pd.read_csv(self.file, nrows=1, sep=self.delimiter)

    
    def readAll(self):
        return str(pd.read_csv(self.file, usecols=self.usecols, delimiter=self.delimiter, float_precision=self.float_precision))
        