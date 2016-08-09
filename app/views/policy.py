#-*- coding:utf-8 -*-
'''
Created on 2016年6月22日

@author: wenbin
'''


from utils import BaseHandler
from router import Route

@Route(Route.confg_prefix+"/filter")
class filterHandler(BaseHandler):
    
    def get(self):
        
        policy_name="请求过滤"
        self.render("policy.html",policy_name = policy_name)
        
@Route(Route.confg_prefix+"/policy_contentswitch")
class contentSwitchHandler(BaseHandler):
    
    def get(self):
        policy_name="内容交换"
        self.render("policy.html",policy_name = policy_name)

@Route(Route.confg_prefix+"/policy_requestrewrite")
class rrewriteHandler(BaseHandler):
    
    def get(self):
        policy_name="请求改写"
        self.render("policy.html",policy_name = policy_name)
    
@Route(Route.confg_prefix+"/policy_headrewrite")
class hrewriteHandler(BaseHandler):
    
    def get(self):
        policy_name="响应头改写"
        self.render("policy.html",policy_name = policy_name)

@Route(Route.confg_prefix+"/policy_contentrewrite")
class crewriteHandler(BaseHandler):
    
    def get(self):
        policy_name="响应内容改写"
        self.render("policy.html",policy_name = policy_name)

@Route(Route.confg_prefix+"/policy_extention")
class extentionHandler(BaseHandler):
    
    def get(self):
        policy_name="策略扩展"
        self.render("policy.html",policy_name = policy_name)
    

