#-*- coding:utf-8 -*-
'''
Created on 2016年6月23日

@author: wenbin
'''

from utils import BaseHandler
from router import Route


@Route("/dashboard")
class dashboardHandler(BaseHandler):
    
    def get(self):
        return self.render("dashboard.html")
        