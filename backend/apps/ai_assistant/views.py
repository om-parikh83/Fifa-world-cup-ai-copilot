from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class AIChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = request.data.get('message', '')
        # Placeholder integration with Gemini AI
        # Normally: response_text = call_gemini_api(message)
        response_text = f"This is an AI response to: '{message}'. Seat sector routes and operations are normal."
        return Response({
            "response": response_text,
            "action_required": "none"
        }, status=status.HTTP_200_OK)

class AITranslateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get('text', '')
        target_lang = request.data.get('target_language', 'en')
        return Response({
            "translated_text": f"[Translated to {target_lang}]: {text}"
        }, status=status.HTTP_200_OK)
