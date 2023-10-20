import os
import fastapi
from types import ModuleType

def check_file(file):
    print(os.path.exists("main.py"))
    print(os.path.abspath("main.py"))

def check_access(file):
    print(os.access("main.py", os.R_OK | os.X_OK))


def check_app(file):
    # Check if the file contains a valid FastAPI app object
    # Import the file as a module
    module = __import__(file)
    if hasattr(module, "app"):
        if isinstance(module.app, fastapi.FastAPI):
            print("Valid FastAPI app object")
        else:
            print("Invalid FastAPI app object")
    else:
        print("No app attribute found in module")

print(check_file("main.py"))
print(check_access("main.py"))