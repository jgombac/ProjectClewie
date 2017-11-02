import pandas as pd

def initialUpload(f):
    return str(pd.read_csv(f, nrows=5, delimiter=";"))