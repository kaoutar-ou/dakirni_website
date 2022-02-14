let INF = 10000;
 
export class Point
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}
 
const onSegment = (p,q,r) =>
{
     if (q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y))
        {
            return true;
        }
        return false;
}
 
const orient = (p,q,r) =>
{
    let val = (q.y - p.y) * (r.x - q.x)
                - (q.x - p.x) * (r.y - q.y);
  
        if (val === 0)
        {
            return 0; 
        }
        return (val > 0) ? 1 : 2; 
}
 
const doIntersect = (p1,q1,p2,q2) =>
{
        let o1 = orient(p1, q1, p2);
        let o2 = orient(p1, q1, q2);
        let o3 = orient(p2, q2, p1);
        let o4 = orient(p2, q2, q1);
  
        if (o1 !== o2 && o3 !== o4)
        {
            return true;
        }
        
        if (o1 === 0 && onSegment(p1, p2, q1))
        {
            return true;
        }
        
        if (o2 === 0 && onSegment(p1, q2, q1))
        {
            return true;
        }
        
        if (o3 === 0 && onSegment(p2, p1, q2))
        {
            return true;
        }
        
        if (o4 === 0 && onSegment(p2, q1, q2))
        {
            return true;
        }
        
        return false;
}

export const isInside = (polygon,p) =>
{
    let n = polygon.length;
        if (n < 3)
        {
            return false;
        }
        
        let extreme = new Point(INF, p.y);
        
        let count = 0, i = 0;
        do
        {
            let next = (i + 1) % n;
            
            if (doIntersect(polygon[i], polygon[next], p, extreme))
            {
                
                if (orient(polygon[i], p, polygon[next]) === 0)
                {
                    return onSegment(polygon[i], p,
                                    polygon[next]);
                }
  
                count++;
            }
            i = next;
        } while (i !== 0);
  
        return (count % 2 === 1);
}

// export default isInside;