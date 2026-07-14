from django.urls import path
from .views import AIChatView, AITranslateView

urlpatterns = [
    path('chat/', AIChatView.as_view(), name='ai_chat'),
    path('translate/', AITranslateView.as_view(), name='ai_translate'),
]
