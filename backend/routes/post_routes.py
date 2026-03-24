from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models.post import Post, Comment, Like
from backend.utils.decorators import current_user_required

post_bp = Blueprint('post', __name__)

@post_bp.route('/create', methods=['POST'])
@current_user_required
def create_post(current_user_id):
    data = request.get_json()
    if not data or not data.get('content'):
        return jsonify({"message": "Content required"}), 400

    new_post = Post(user_id=current_user_id, content=data['content'])
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"message": "Post created", "post_id": new_post.id}), 201

@post_bp.route('/feed', methods=['GET'])
@current_user_required
def get_feed(current_user_id):
    posts = Post.query.order_by(Post.created_at.desc()).all()
    result = []
    
    from backend.models.user import User
    
    for p in posts:
        author = User.query.get(p.user_id)
        likes_count = Like.query.filter_by(post_id=p.id).count()
        comments_count = Comment.query.filter_by(post_id=p.id).count()
        
        result.append({
            "id": p.id,
            "author_name": author.name if author else "Unknown",
            "content": p.content,
            "created_at": p.created_at.isoformat(),
            "likes": likes_count,
            "comments": comments_count
        })
        
    return jsonify(result), 200

@post_bp.route('/like', methods=['POST'])
@current_user_required
def like_post(current_user_id):
    data = request.get_json()
    post_id = data.get('post_id')
    
    if not post_id:
        return jsonify({"message": "post_id required"}), 400

    existing_like = Like.query.filter_by(post_id=post_id, user_id=current_user_id).first()
    if existing_like:
        db.session.delete(existing_like)
        db.session.commit()
        return jsonify({"message": "Post unliked"}), 200

    new_like = Like(post_id=post_id, user_id=current_user_id)
    db.session.add(new_like)
    db.session.commit()
    return jsonify({"message": "Post liked"}), 201

@post_bp.route('/comment', methods=['POST'])
@current_user_required
def comment_post(current_user_id):
    data = request.get_json()
    post_id = data.get('post_id')
    content = data.get('content')
    
    if not post_id or not content:
        return jsonify({"message": "post_id and content required"}), 400

    new_comment = Comment(post_id=post_id, user_id=current_user_id, content=content)
    db.session.add(new_comment)
    db.session.commit()

    return jsonify({"message": "Comment added"}), 201
