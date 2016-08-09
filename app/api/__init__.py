#-*- coding:utf-8 -*-
'''
Created on 2016年7月28日

@author: wenbin
'''

from utils import BaseHandler
from router import Route
import tornado
from tornado.httpclient import AsyncHTTPClient
import json


@Route("/api/agent/vlans")
class vlans(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine 
    def get(self):
        u'''获取vlan 列表数据'''
        vlan_name = self.get_argument('vlan_name',default='')
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlans = reps.body
        self.finish(vlans)
        
@Route("/api/agent/vlan")
class vlan(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine 
    def get(self):
        u'''获取单个vlan数据'''
        vlan_name = self.get_argument('vlan_name',default='')
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlan/'+vlan_name,headers=self.api_headers)
        if reps.code ==200:
            self.finish(reps.body)
        else:
            self.finish('{"status":"failure"}')
        
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine 
    def post(self):
        u'''增加一个vlan'''
        
        #vlanobj = json.loads(self.request.body)
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlan',body=self.request.body,headers=self.api_headers,method="POST")
        
        if reps.code ==200:
            self.finish(reps.body)
        else:
            self.finish('{"status":"failure"}')
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine 
    def put(self):
        u'''修改一个vlan'''
#         vlanobj = json.loads(self.request.body)
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlan',body=self.request.body,headers=self.api_headers,method="PUT")
        if reps.code ==200:
            self.finish(reps.body)
        else:
            self.finish('{"status":"failure"}')