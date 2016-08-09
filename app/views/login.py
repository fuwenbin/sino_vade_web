#-*- coding:utf-8 -*-
'''
Created on 2016年7月7日

@author: wenbin
'''

from utils import BaseHandler
from router import Route

@Route('/login')
class loginHandler(BaseHandler):
    
    def get(self):
        
        return self.render("login.html")