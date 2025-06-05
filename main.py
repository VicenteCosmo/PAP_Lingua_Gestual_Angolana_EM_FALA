from flask import Flask, render_template, Response, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
import mediapipe as mp
import pickle
import socket
import time

app = Flask(__name__)
CORS(app)

# Configurações
host = '192.168.22.68'
port = 12345
buffer_size = 1024
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Variáveis globais
current_mode = None  # 'a_to_e' ou 'f_to_j'
cap = None
label = ''
last_label = ''

# Carregar modelos
model_dict_a_to_e = pickle.load(open('./a_to_e.p', 'rb'))
model_dict_f_to_j = pickle.load(open('./f_to_j.p', 'rb'))
model_dict_k_to_q = pickle.load(open('./k_to_q.p', 'rb'))
model_dict_r_to_z = pickle.load(open('./r_to_z.p', 'rb'))
model_dict_number = pickle.load(open('./numbers.p', 'rb'))
model_dict_geral_1_hand = pickle.load(open('./geral_1_hand.p', 'rb'))

model_a_to_e = model_dict_a_to_e['model']
model_f_to_j = model_dict_f_to_j['model']
model_k_to_q = model_dict_k_to_q['model']
model_r_to_z = model_dict_r_to_z['model']
model_numbers = model_dict_number['model']
model_geral_1_hand = model_dict_geral_1_hand['model']

# Configura MediaPipe
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.3)

def get_camera():
    global cap
    if cap is None or not cap.isOpened():
        cap = cv2.VideoCapture(0)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        cap.set(cv2.CAP_PROP_FPS, 30)
    return cap

def release_camera():
    global cap
    if cap is not None:
        if cap.isOpened():
            cap.release()
        cap = None

def process_frame(model):
    global label, last_label
    
    cap = get_camera()
    ret, frame = cap.read()
    if not ret:
        release_camera()
        return None
    
    H, W = frame.shape[:2]
    frame = cv2.flip(frame, 1)
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)
    
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )
            
            data_aux = []
            x_ = []
            y_ = []
            
            for landmark in hand_landmarks.landmark:
                x = landmark.x
                y = landmark.y
                data_aux.extend([x, y])
                x_.append(x)
                y_.append(y)
            
            x1 = int(min(x_) * W) - 10
            y1 = int(min(y_) * H) - 10
            x2 = int(max(x_) * W) - 10
            y2 = int(max(y_) * H) - 10
            
            prediction = model.predict([np.asarray(data_aux)])
            predicted_char = str(prediction[0])
            
            label = predicted_char
            if label != last_label:
                try:
                    udp_socket.sendto(label.encode(), (host, port))
                    print(f'Sinal detectado: {label}')
                    last_label = label
                except Exception as e:
                    print(f"Erro ao enviar sinal: {e}")
            
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
            cv2.putText(frame, label, (x1, y1 - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3, cv2.LINE_AA)
    
    _, buffer = cv2.imencode('.jpg', frame)
    return buffer.tobytes()

@app.route('/video_active1', methods=['POST'])
def activate_a_to_e():
    global current_mode
    action = request.form.get('action')
    
    if action == 'start':
        current_mode = 'a_to_e'
        print("Modo A-E ATIVADO")
    elif action == 'stop':
        current_mode = None
        release_camera()
        print("Câmera LIBERADA")
    
    return jsonify({"status": "success", "active": current_mode == 'a_to_e'})

@app.route('/video_active2', methods=['POST'])
def activate_f_to_j():
    global current_mode
    action = request.form.get('action')
    
    if action == 'start':
        current_mode = 'f_to_j'
        print("Modo F-J ATIVADO")
    elif action == 'stop':
        current_mode = None
        release_camera()
        print("Câmera LIBERADA")
    
    return jsonify({"status": "success", "active": current_mode == 'f_to_j'})

@app.route('/video_active3', methods=['POST'])
def activate_k_to_q():
    global current_mode
    action = request.form.get('action')
    
    if action == 'start':
        current_mode = 'k_to_q'
        print("Modo K-Q ATIVADO")
    elif action == 'stop':
        current_mode = None
        release_camera()
        print("Câmera LIBERADA")
    
    return jsonify({"status": "success", "active": current_mode == 'k_to_q'})


@app.route('/video_active4', methods=['POST'])
def activate_r_to_z():
    global current_mode
    action = request.form.get('action')
    
    if action == 'start':
        current_mode = 'r_to_z'
        print("Modo R-Z ATIVADO")
    elif action == 'stop':
        current_mode = None
        release_camera()
        print("Câmera LIBERADA")
    
    return jsonify({"status": "success", "active": current_mode == 'r_to_z'})

@app.route('/video_active5', methods=['POST'])
def activate_numbers():
    global current_mode
    action = request.form.get('action')
    
    if action == 'start':
        current_mode = 'Numbers'
        print("Modo Numbers ATIVADO")
    elif action == 'stop':
        current_mode = None
        release_camera()
        print("Câmera LIBERADA")
    
    return jsonify({"status": "success", "active": current_mode == 'Numbers'})

@app.route('/video_active6', methods=['POST'])
def activate_geral_1_hand():
    global current_mode
    action = request.form.get('action')
    
    if action == 'start':
        current_mode = 'geral_1_hand'
        print("Modo R-Z ATIVADO")
    elif action == 'stop':
        current_mode = None
        release_camera()
        print("Câmera LIBERADA")
    
    return jsonify({"status": "success", "active": current_mode == 'geral_1_hand'})



def generate_frames():
    while True:
        if current_mode == 'a_to_e':
            frame = process_frame(model=model_a_to_e)
            if frame is not None:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + 
                      cv2.imencode('.jpg', np.zeros((480, 640, 3), dtype=np.uint8))[1].tobytes() + 
                      b'\r\n')
        elif current_mode == 'f_to_j':
            frame = process_frame(model=model_f_to_j)
            if frame is not None:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + 
                      cv2.imencode('.jpg', np.zeros((480, 640, 3), dtype=np.uint8))[1].tobytes() + 
                      b'\r\n')
                
        elif current_mode == 'k_to_q':
            frame = process_frame(model=model_k_to_q)
            if frame is not None:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + 
                      cv2.imencode('.jpg', np.zeros((480, 640, 3), dtype=np.uint8))[1].tobytes() + 
                      b'\r\n')        
        
        elif current_mode == 'r_to_z':
            frame = process_frame(model=model_r_to_z)
            if frame is not None:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + 
                      cv2.imencode('.jpg', np.zeros((480, 640, 3), dtype=np.uint8))[1].tobytes() + 
                      b'\r\n')        
        
        
        elif current_mode == 'Numbers':
            frame = process_frame(model=model_numbers)
            if frame is not None:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + 
                      cv2.imencode('.jpg', np.zeros((480, 640, 3), dtype=np.uint8))[1].tobytes() + 
                      b'\r\n')        
                
        elif current_mode == 'geral_1_hand':
            frame = process_frame(model=model_geral_1_hand)
            if frame is not None:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                yield (b'--frame\r\n'
                      b'Content-Type: image/jpeg\r\n\r\n' + 
                      cv2.imencode('.jpg', np.zeros((480, 640, 3), dtype=np.uint8))[1].tobytes() + 
                      b'\r\n')        
                
        else:
            time.sleep(0.1)

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_label')
def get_label():
    return jsonify({"label": label})

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5000, debug=True)
    finally:
        release_camera()
        udp_socket.close()