# import zipfile
# #from botocore.client import Config
import json
import zipfile
import mimetypes
import boto3
from io import BytesIO

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-2:584503411096:deployPersonalSiteTopic')

    try:
        s3 = boto3.resource('s3')#, config=Config(signature_version='s3v4'))
        personal_bucket = s3.Bucket('personal.wesleychambers.com')
        build_bucket = s3.Bucket('personalbuild.wesleychambers.com')

        # # This is for in memory storage
        personal_zip = BytesIO()
        build_bucket.download_fileobj('personalbuild.zip', personal_zip)

        with zipfile.ZipFile(personal_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                personal_bucket.upload_fileobj(obj, nm, ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                personal_bucket.Object(nm).Acl().put(ACL='public-read')

        # # On Windows and some other OS, this will be a different location than /tmp
        # build_bucket.download_file('personalbuild.zip', '/tmp/personalbuild.zip')

        # with zipfile.ZipFile('/tmp/personalbuild.zip') as myzip:
        #     for nm in myzip.namelist():
        #         obj = myzip.open(nm)
        #         personal_bucket.upload_fileobj(obj, nm)
        #         personal_bucket.Object(nm).Acl().put(ACL='public-read')

        print('Job done!')

        topic.publish(Subject='Deployment', Message='Personal site deployed!')
    except:
        topic.publish(Subject='Deployment failed', Message='Personal site was not successfully deployed.')
        raise

    return 'Hello from Lambda!'
