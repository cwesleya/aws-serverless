# aws-serverless

This is a "serverless" portfolio/personal site. It ties together several aspects of DevOps & automation.

# Technologies

Brew, Git, GitHub, SSH, HTML, CSS, Font Awesome, Google Fonts

LOTS of AWS (see below)!

# Automated CI/CD Process
The static site, wesleychambers.com, is registered in **Route53** and hosted in **S3** behind a **CloudFront** distribution. When code is pushed to the master branch, a **CodePipeline** process kicks off. It takes the code from this GitHub repository, makes a build using **CodeBuild** (based on the buildspec.yml), which zips the built code and puts it into an S3 bucket. The pipeline then executes a **Lambda** function, written in python, which unzips and publishes the site to the another bucket, before finally using **SNS** to send an email to the admin (me!).      
