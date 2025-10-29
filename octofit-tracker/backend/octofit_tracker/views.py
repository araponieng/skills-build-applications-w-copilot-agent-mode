from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import os

def get_base_url():
    """Get the base URL for the API based on environment"""
    codespace_name = os.getenv('CODESPACE_NAME')
    if codespace_name:
        return f"https://{codespace_name}-8000.app.github.dev"
    return "http://localhost:8000"

@csrf_exempt
@require_http_methods(["GET", "POST"])
def activities_api(request):
    """Activities API endpoint"""
    base_url = get_base_url()
    
    if request.method == 'GET':
        return JsonResponse({
            'message': 'Activities API endpoint',
            'base_url': base_url,
            'endpoint': f'{base_url}/api/activities/',
            'methods': ['GET', 'POST'],
            'data': [
                {
                    'id': 1,
                    'name': 'Running',
                    'duration': 30,
                    'calories': 300
                },
                {
                    'id': 2,
                    'name': 'Cycling',
                    'duration': 45,
                    'calories': 400
                }
            ]
        })
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            return JsonResponse({
                'message': 'Activity created successfully',
                'base_url': base_url,
                'data': data
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def users_api(request):
    """Users API endpoint"""
    base_url = get_base_url()
    
    if request.method == 'GET':
        return JsonResponse({
            'message': 'Users API endpoint',
            'base_url': base_url,
            'endpoint': f'{base_url}/api/users/',
            'methods': ['GET', 'POST'],
            'data': [
                {
                    'id': 1,
                    'username': 'john_doe',
                    'email': 'john@example.com'
                },
                {
                    'id': 2,
                    'username': 'jane_smith',
                    'email': 'jane@example.com'
                }
            ]
        })
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            return JsonResponse({
                'message': 'User created successfully',
                'base_url': base_url,
                'data': data
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def teams_api(request):
    """Teams API endpoint"""
    base_url = get_base_url()
    
    if request.method == 'GET':
        return JsonResponse({
            'message': 'Teams API endpoint',
            'base_url': base_url,
            'endpoint': f'{base_url}/api/teams/',
            'methods': ['GET', 'POST'],
            'data': [
                {
                    'id': 1,
                    'name': 'Fitness Warriors',
                    'members': 15
                },
                {
                    'id': 2,
                    'name': 'Marathon Runners',
                    'members': 8
                }
            ]
        })
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            return JsonResponse({
                'message': 'Team created successfully',
                'base_url': base_url,
                'data': data
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

@csrf_exempt
@require_http_methods(["GET"])
def leaderboard_api(request):
    """Leaderboard API endpoint"""
    base_url = get_base_url()
    
    return JsonResponse({
        'message': 'Leaderboard API endpoint',
        'base_url': base_url,
        'endpoint': f'{base_url}/api/leaderboard/',
        'methods': ['GET'],
        'data': [
            {
                'rank': 1,
                'username': 'john_doe',
                'total_calories': 15000,
                'total_activities': 45
            },
            {
                'rank': 2,
                'username': 'jane_smith',
                'total_calories': 12500,
                'total_activities': 38
            }
        ]
    })

def api_root(request):
    """API root endpoint that lists all available endpoints"""
    base_url = get_base_url()
    
    return JsonResponse({
        'message': 'OctoFit Tracker API',
        'base_url': base_url,
        'endpoints': {
            'activities': f'{base_url}/api/activities/',
            'users': f'{base_url}/api/users/',
            'teams': f'{base_url}/api/teams/',
            'leaderboard': f'{base_url}/api/leaderboard/'
        },
        'version': '1.0.0'
    })