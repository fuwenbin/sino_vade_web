#-*- coding:utf-8 -*-
'''
Created on 2016年6月22日

@author: wenbin
'''

import tornado.web
from router import Route
import os
class Application(tornado.web.Application):
    
    def __init__(self):
        settings = dict(
            gzip=True,
            template_path=os.path.join(os.path.dirname(__file__), "template"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            static_handler_class=tornado.web.StaticFileHandler,
            cookie_secret='61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",',
            debug=True,
            login_url = '/'
        )
        tornado.web.Application.__init__(self, Route.get_routes(),**settings)