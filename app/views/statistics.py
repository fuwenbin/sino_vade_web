#-*- coding:utf-8 -*-
'''
Created on 2016年6月23日

@author: wenbin
'''

from utils import BaseHandler
from router import Route


@Route("/statistics")
class statisticsHandler(BaseHandler):
    def get(self):
        self.render("statistics.html")
