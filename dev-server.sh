#!/bin/bash

# ProtoKit Dev Server Manager
# Управление локальным dev-сервером Vite
# Версия 1.1 — с поддержкой улучшенного error handling

set -e

PORT=5173
LOGDIR="./protokit/logs"
LOG_FILE="$LOGDIR/dev-server.log"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для проверки, работает ли сервер
server_is_running() {
  lsof -ti :$PORT > /dev/null 2>&1
}

# Функция для запуска сервера
start_server() {
  if server_is_running; then
    echo -e "${YELLOW}⚠️  Сервер уже запущен на порту $PORT${NC}"
    local PID=$(lsof -ti :$PORT)
    echo -e "${YELLOW}   PID: $PID${NC}"
    return 1
  fi
  
  echo -e "${GREEN}▶ Запуск dev-сервера на http://localhost:$PORT${NC}"
  
  # Убедимся, что директория логов существует
  mkdir -p "$LOGDIR"
  
  # Запускаем сервер в фоне с логированием (абсолютный путь для логов)
  cd protokit
  LOG_FULL_PATH="$(pwd)/logs/dev-server.log"
  nohup npm run dev -- --host > "$LOG_FULL_PATH" 2>&1 &
  local PID=$!
  cd ..
  
  # Даём серверу время на запуск (ждём немного дольше)
  local wait_count=0
  local max_wait=15
  
  while [ $wait_count -lt $max_wait ]; do
    if server_is_running; then
      echo -e "${GREEN}✓ Сервер запущен (PID: $PID)${NC}"
      echo -e "${GREEN}✓ URL: http://localhost:$PORT${NC}"
      echo -e "${GREEN}✓ Логи: tail -f $LOG_FILE${NC}"
      return 0
    fi
    ((wait_count++))
    sleep 1
  done
  
  echo -e "${RED}✗ Ошибка запуска сервера (timeout). Последние логи:${NC}"
  tail -20 "$LOG_FILE" 2>/dev/null || echo "Логи недоступны"
  return 1
}

# Функция для остановки сервера
stop_server() {
  if ! server_is_running; then
    echo -e "${YELLOW}⚠️  Сервер не запущен${NC}"
    return 1
  fi
  
  local PID=$(lsof -ti :$PORT)
  echo -e "${YELLOW}⏹ Остановка сервера (PID: $PID)...${NC}"
  
  # Пробуем SIGTERM (корректное завершение)
  kill -TERM $PID 2>/dev/null || true
  
  # Даём процессу время на корректное завершение
  sleep 2
  
  # Если всё ещё работает, убиваем -9
  if server_is_running; then
    echo -e "${YELLOW}⚠️  Процесс не завершился, принудительное завершение...${NC}"
    kill -9 $PID 2>/dev/null || true
    sleep 1
  fi
  
  if ! server_is_running; then
    echo -e "${GREEN}✓ Сервер остановлен${NC}"
    return 0
  else
    echo -e "${RED}✗ Не удалось остановить сервер${NC}"
    return 1
  fi
}

# Функция для перезапуска
restart_server() {
  stop_server || true
  sleep 1
  start_server
}

# Функция для показа статуса
status_server() {
  if server_is_running; then
    local PID=$(lsof -ti :$PORT)
    echo -e "${GREEN}✓ Сервер работает${NC}"
    echo -e "  PID: $PID"
    echo -e "  URL: http://localhost:$PORT"
    echo -e "  Логи: tail -f $LOG_FILE"
    
    # Проверяем доступность через HTTP
    if curl -s -m 2 http://localhost:$PORT > /dev/null 2>&1; then
      echo -e "  HTTP: ${GREEN}✓ Доступен${NC}"
    else
      echo -e "  HTTP: ${YELLOW}⚠️  Не доступен${NC}"
    fi
  else
    echo -e "${RED}✗ Сервер не запущен${NC}"
  fi
}

# Функция для показа логов
show_logs() {
  if [ ! -f "$LOG_FILE" ]; then
    echo -e "${YELLOW}⚠️  Логи ещё не созданы${NC}"
    return
  fi
  tail -f "$LOG_FILE"
}

# Функция для проверки зависимостей
check_dependencies() {
  local missing_deps=()
  
  if ! command -v npm &> /dev/null; then
    missing_deps+=("npm")
  fi
  
  if ! command -v lsof &> /dev/null; then
    missing_deps+=("lsof")
  fi
  
  if [ ${#missing_deps[@]} -gt 0 ]; then
    echo -e "${RED}✗ Отсутствуют зависимости: ${missing_deps[*]}${NC}"
    return 1
  fi
  
  return 0
}

# Главное меню
case "${1:-help}" in
  start)
    check_dependencies || exit 1
    start_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    check_dependencies || exit 1
    restart_server
    ;;
  status)
    status_server
    ;;
  logs)
    show_logs
    ;;
  *)
    echo -e "${GREEN}ProtoKit Dev Server Manager${NC}"
    echo ""
    echo "Использование: ./dev-server.sh <команда>"
    echo ""
    echo "Команды:"
    echo "  ${GREEN}start${NC}    - Запустить dev-сервер в фоне на порту $PORT"
    echo "  ${GREEN}stop${NC}     - Остановить работающий сервер"
    echo "  ${GREEN}restart${NC}  - Перезапустить сервер"
    echo "  ${GREEN}status${NC}   - Показать статус и доступность сервера"
    echo "  ${GREEN}logs${NC}     - Показать логи в реальном времени (Ctrl+C для выхода)"
    echo ""
    echo "Примеры:"
    echo "  ./dev-server.sh start   # запустить в фоне"
    echo "  ./dev-server.sh status  # проверить статус"
    echo "  ./dev-server.sh logs    # смотреть логи"
    echo "  ./dev-server.sh stop    # остановить"
    echo ""
    echo "Сервер работает на: http://localhost:$PORT"
    echo "Логи сохраняются в: $LOG_FILE"
    ;;
esac
