import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {"json"}

app = Flask(__name__)


@app.route("/api")
def home():
    return "Hello, World!"


@app.route("/api/about")
def about():
    return "About"


@app.route("/api/generate-pdf")
def generate_pdf():
    return "generate pdf"


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/api/uploads", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        # check if the post request has the file part
        if "file" not in request.files:
            return "No file part"
        file = request.files["file"]
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == "":
            return "No selected file"
        if file and allowed_file(file.filename):
            # filename = secure_filename(file.filename or "example")
            # file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            # return redirect(url_for("download_file", name=filename))
            return "File allowed!"
    return """
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    """
