#-*- coding:utf-8 -*-
'''
Created on 2016年6月22日

@author: wenbin
'''

from utils import BaseHandler
from router import Route

@Route(Route.confg_prefix+"/lb_member")
class memberHandler(BaseHandler):
    
    def get(self):
        
        return self.render("slbRserver.html")
    
@Route(Route.confg_prefix+"/lb_vserver")
class vserverHandler(BaseHandler):
    
    def get(self):
        return self.render("slbVserver.html")
    
    
@Route(Route.confg_prefix+"/lb_healthcheck")
class healthcheckHandler(BaseHandler):
    
    def get(self):
        
        return self.render("healthcheck.html")

@Route(Route.confg_prefix+"/lb_pool")
class poolHandler(BaseHandler):
    
    def get(self):
        
        return self.render("slbPool.html")
    
@Route(Route.confg_prefix+"/lb_losepage")
class loseHandler(BaseHandler):
    
    def get(self):
        pass
        
