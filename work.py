#-*- coding:utf-8 -*-
'''
Created on 2016年6月22日

@author: wenbin
'''
import tornado
from tornado import httpserver
from tornado.options import define, options
from app.views import sys,lb,network,policy,dashboard,statistics,login
from app import validate
from app import api
from application import Application
if __name__ == "__main__":
    define("port", default=8080, type=int)
    tornado.options.parse_command_line()
    server = httpserver.HTTPServer(Application())
    server.listen(options.port)
    instance = tornado.ioloop.IOLoop.instance()
    instance.start()
    server.start(0)