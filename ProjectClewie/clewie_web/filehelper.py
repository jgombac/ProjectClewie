import pandas as pd

class FileHelper(object):
    file = None;

    delimiter = ","
    float_precision = None
    nrows = 5
    usecols = None

    features = []
    labels = []

    def __init__(self, f):
        self.file = f

    def updateOptions(self, options):
        self.delmiter = options.delimiter
        self.float_precision = options.float_precision
        self.usecols = options.usecols

    def readPartial(self):
        return str(pd.read_csv(self.file, nrows=5, usecols=self.usecols, delimiter=self.delimiter, float_precision=self.float_precision))

    
    def readAll(self):
        return str(pd.read_csv(self.file, usecols=self.usecols, delimiter=self.delimiter, float_precision=self.float_precision))
        