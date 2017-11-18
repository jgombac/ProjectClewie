import tensorflow as tf
import numpy as np
import os
import urllib.request
from django.conf import settings


class Estimator(object):

    properties = {}
    id = None

    def __init__(self, id, params=None):
        self.id = id
        print(id)

    def initialize(self, params):
        pass

    def train(self, params):
        pass
    
    def predict(self, params):
        pass
    
    def properties(self):
        return self.properties


class Regressor(Estimator):

    def __init__(self, params):
        pass

    def initialize(self, params):
        pass

    def train(self, params):
        pass
    
    def predict(self, params):
        pass
    
    def properties(self):
        return self.properties

class Classificator(Estimator):

    classifier = None

    def __init__(self, params=None):
        pass

    def initialize(self, params=None):
        num_features = 4
        hidden_units = [10, 20, 10]
        n_classes = 3
        model_dir = settings.BASE_DIR + "/classifiers/" + "gombitest"
        print(model_dir)
        feature_columns = [tf.feature_column.numeric_column("x", shape=[num_features])]
        self.classifier = tf.estimator.DNNClassifier(feature_columns=feature_columns,
                                                    hidden_units=hidden_units,
                                                    n_classes=n_classes,
                                                    model_dir=model_dir)
        print("classifier initialized")

    def train(self, params=None):
        IRIS_TRAINING = "iris_training.csv"
        IRIS_TRAINING_URL = "http://download.tensorflow.org/data/iris_training.csv"

        IRIS_TEST = "iris_test.csv"
        IRIS_TEST_URL = "http://download.tensorflow.org/data/iris_test.csv"
        if not os.path.exists(IRIS_TRAINING):
            raw = urllib.request.urlopen(IRIS_TRAINING_URL).read()
            with open(IRIS_TRAINING, "wb") as f:
                f.write(raw)

        if not os.path.exists(IRIS_TEST):
            raw = urllib.request.urlopen(IRIS_TEST_URL).read()
            with open(IRIS_TEST, "wb") as f:
                f.write(raw)

        training_set = tf.contrib.learn.datasets.base.load_csv_with_header(filename=IRIS_TRAINING, target_dtype=np.int,
                                                                        features_dtype=np.float32)

        test_set = tf.contrib.learn.datasets.base.load_csv_with_header(filename=IRIS_TEST, target_dtype=np.int,
                                                                    features_dtype=np.float32)

        train_input_fn = tf.estimator.inputs.numpy_input_fn(
        x={"x": np.array(training_set.data)},
        y=np.array(training_set.target),
        num_epochs=None,
        shuffle=True)

        self.classifier.train(input_fn=train_input_fn, steps=2000)

        test_input_fn = tf.estimator.inputs.numpy_input_fn(
            x={"x": np.array(test_set.data)},
            y=np.array(test_set.target),
            num_epochs=1,
            shuffle=False)

        accuracy_score = self.classifier.evaluate(input_fn=test_input_fn)["accuracy"]
        print(accuracy_score)
    
    def predict(self, params):
        pass
    
    def properties(self):
        return self.properties