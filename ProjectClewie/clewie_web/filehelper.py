import pandas as pd

object FileHelper(object):
    file = None;

    delimiter = ","
    nrows = 5
    hasHeader = True
    columns = []
    features = []
    labels = []

    def __init__(self, f):
        self.file = f
        self.initialUpload()

    def updateOptions(self, options):
        return None

    def readWithOptions(self, options):
        return None

    def initialUpload(self):
        return str(pd.read_csv(self.file, nrows=5, delimiter=";"))