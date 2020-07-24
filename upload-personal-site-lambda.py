import json
import boto3
import zipfile
import mimetypes

from io import BytesIO

def lambda_handler(event, context):
    s3 = boto3.resource('s3')

    personal_bucket = s3.Bucket('personal.wesleychambers.com')
    build_bucket = s3.Bucket('personalbuild.wesleychambers.com')

    personal_zip = BytesIO()
    build_bucket.download_fileobj('personalbuild.zip', personal_zip)

    with zipfile.ZipFile(personal_zip) as myzip:
        for nm in myzip.namelist():
            obj = myzip.open(nm)
            personal_bucket.upload_fileobj(obj, nm, ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
            personal_bucket.Object(nm).Acl().put(ACL='public-read')

    print('Job done!')

    return 'Hello from Lambda!'


## Below is a LAMBDA SCRIPT that downloads zipfile to disk to save in memory MB

# import boto3
# import zipfile
# #from botocore.client import Config
#
# s3 = boto3.resource('s3')#, config=Config(signature_version='s3v4'))
#
# personal_bucket = s3.Bucket('personal.wesleychambers.com')
#
# build_bucket = s3.Bucket('personalbuild.wesleychambers.com')
#
# # On Windows, this will need to be a different location than /tmp
# build_bucket.download_file('portfolio.zip', '/tmp/portfolio.zip')
#
# with zipfile.ZipFile('/tmp/portfolio.zip') as myzip:
#     for nm in myzip.namelist():
#         obj = myzip.open(nm)
#         target_bucket.upload_fileobj(obj, nm)
#         target_bucket.Object(nm).Acl().put(ACL='public-read')
