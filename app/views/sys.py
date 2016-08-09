# -*- coding:utf-8 -*-
'''
Created on 2016年6月22日

@author: wenbin
'''
from utils import BaseHandler
from router import Route

@Route("/config")
class configHandler(BaseHandler):
    def get(self):
        self.render("config2.html")
        

@Route("/index")
class indexhandler(BaseHandler):
    def get(self):
        self.render("base2.html")
   
@Route(Route.confg_prefix+"/sys_acl")
class aclHandler(BaseHandler):
    def get(self):
        self.render("config.html")

@Route(Route.confg_prefix+"/sys_device")
class deviceehandler(BaseHandler):
    def get(self):
        self.render("advancemanage.html")
        
    

@Route(Route.confg_prefix+"/sys_user")
class userHandler(BaseHandler):
    def get(self):
        self.render("user.html")

@Route(Route.confg_prefix+"/sys_cert")
class certHandler(BaseHandler):
    def get(self):
        self.render("certificate.html")
    
@Route(Route.confg_prefix+"/sys_snmp")
class snmpHandler(BaseHandler):
    def get(self):
        self.render("snmp.html")

@Route(Route.confg_prefix+"/sys_deviceparams")
class deviceParamHandler(BaseHandler):
    def get(self):
        self.render("sysconfig.html")
        
@Route(Route.confg_prefix+"/sys_info")
class sysinfoHandler(BaseHandler):
    
    def get(self):
        self.render("config.html")
        
            
@Route(Route.confg_prefix+"/log")
class logHandler(BaseHandler):
    
    def get(self):
        self.render("log.html")
    
@Route(Route.confg_prefix+"/warning")
class warnHandler(BaseHandler):
    
    def get(self):
        self.render("warning.html")
        
@Route(Route.confg_prefix+"/diagnosis")
class diagnosisHandler(BaseHandler):
    
    def get(self):
        self.render("diagnosis.html")