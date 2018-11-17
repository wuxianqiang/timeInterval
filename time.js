
function padNumber (num, fill = 2) {
  const len = ('' + num).length
  return (Array(
      fill > len ? fill - len + 1 || 0 : 0
  ).join(0) + num)
}

function parseTime (time) {
  const values = (time || '').split(':')
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10)
    const minutes = parseInt(values[1], 10)
    return {
      hours,
      minutes
    };
  }
  return null;
}

function formatDot (time) {
  const [, hours, minutes] = /(\d{2})(\d{2})/.exec(padNumber(time, 4))
  return `${hours}:${minutes}`
}

function calculateLastTime (start, end, step) {
  const result = []
  const value1 = parseTime(formatDot(start))
  const value2 = parseTime(formatDot(end))
  let isCrossDays = false
  let hours = value1.hours
  let minutes = value1.minutes
  if (start > end) {
    while (hours < 24) {
      let temp = minutes + step
      if (temp >= 60) {
        temp = temp - 60
        hours++
      }
      minutes = temp
      result.push({hours, minutes, isCrossDays})
    }
    const lastTime = result[result.length - 1]
    minutes = lastTime.minutes
    hours = lastTime.hours
    if (hours === 24) {
      hours = 0
      if (minutes) {
        lastTime.hours = 0
        lastTime.isCrossDays = true
      }
    }
    isCrossDays = true
  }
  while (hours <= value2.hours) {
    let temp = minutes + step
    if (temp >= 60) {
      temp = temp - 60
      hours++
    }
    minutes = temp
    if (hours > value2.hours || (hours === value2.hours && minutes > value2.minutes)) {
      break
    }
    result.push({hours, minutes, isCrossDays})
  }
  return result
}

calculateLastTime(2200, 115, 15) // 从 22:00 到 1:15 每间隔15分钟计算
